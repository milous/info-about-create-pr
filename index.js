const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
	try {
		const inputs = {
			// settings
			token: core.getInput('repo-token', {required: true}),
			prBodyPrefix: core.getInput('pr-body-prefix'),
			prBodySuffix: core.getInput('pr-body-suffix'),
			issueBodyPrefix: core.getInput('issue-body-prefix'),
			issueBodySuffix: core.getInput('issue-body-suffix'),
			// payload
			prNumber: github.context.payload.number,
			repo: github.context.payload.repository.full_name,
			headBranch: github.context.payload.pull_request.head.ref,
		}

		const detectIssueNumberMatch = inputs.headBranch.match(/\d+/g);
		const outputs = {
			detectedIssueNumber: detectIssueNumberMatch !== null ? detectIssueNumberMatch[0] : null,
			branch: inputs.headBranch,

			prepare: function (source) {
				return source
					.replace('{issueNumber}', this.detectedIssueNumber !== null ? this.detectedIssueNumber : '~')
					.replace('{prNumber}', inputs.prNumber)
				;
			},

			get prBodyPrefix() {
				return this.prepare(inputs.prBodyPrefix);
			},
			get prBodySuffix() {
				return this.prepare(inputs.prBodySuffix);
			},
			get issueBodyPrefix() {
				return this.prepare(inputs.issueBodyPrefix);
			},
			get issueBodySuffix() {
				return this.prepare(inputs.issueBodySuffix);
			}
		};

		const octokit = new github.getOctokit(inputs.token);

		if (outputs.detectedIssueNumber !== null) {
			core.info(`Detected issue number: ${outputs.detectedIssueNumber}`);
		}

		// ISSUE
		if (outputs.detectedIssueNumber === null) {
			core.debug(`Issue number was not detected from the branch name: ${inputs.headBranch}`);
		} else if (inputs.issueBodyPrefix === "" && inputs.issueBodyPrefix === "") {
			core.debug('Issue prefix and suffix is not set');
		} else {
			const issueResponse = await octokit
				.request(`GET /repos/${inputs.repo}/issues/${outputs.detectedIssueNumber}`)
				.then(function (res) {
					let issueBody = res.data.body;

					if (inputs.issueBodyPrefix !== "") {
						issueBody = outputs.issueBodyPrefix + "\n" + issueBody;
					}

					if (inputs.issueBodySuffix !== "") {
						issueBody += "\n" + outputs.issueBodySuffix;
					}

					return octokit.request(`PATCH /repos/${inputs.repo}/issues/${outputs.detectedIssueNumber}`, {
						body: issueBody,
					});
				})
			;

			core.info(`Issue response status: ${issueResponse.status}`);
			if (issueResponse.status !== 200) {
				core.error('Issue body was not updated');
			}
		}

		// PR
		if (inputs.prBodyPrefix !== "" || inputs.prBodySuffix !== "") {
			const prNumber = github.context.payload.number;
			let prBody = github.context.payload.pull_request.body;
			if (inputs.prBodyPrefix !== "") {
				prBody = outputs.prBodyPrefix + "\n" + prBody;
			}

			if (inputs.prBodySuffix !== "") {
				prBody += "\n" + outputs.prBodySuffix;
			}

			const prResponse = await octokit
				.request(`PATCH /repos/${inputs.repo}/pulls/${prNumber}`, {
					body: prBody,
				})
			;

			core.info(`PR response status: ${prResponse.status}`);
			if (prResponse.status !== 200) {
				core.error('PR body was not updated');
			}
		}
	}
	catch (error) {
		core.error(error);
		core.setFailed(error.message);
	}
}

run();
