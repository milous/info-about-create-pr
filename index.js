const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
	try {
		const inputs = {
			token: core.getInput('repo-token', {required: true}),
			prBodyPrefix: core.getInput('pr-body-prefix'),
			prBodySuffix: core.getInput('pr-body-suffix'),
			issueBodyPrefix: core.getInput('issue-body-prefix'),
			issueBodySuffix: core.getInput('issue-body-suffix'),
		}

		const octokit = new github.getOctokit(inputs.token);
		const repo = github.context.payload.repository.full_name;

		let headBranch = github.context.payload.pull_request.head.ref;
		let detectIssueNumberMatch = headBranch.match(/\d+/g);

		if (detectIssueNumberMatch === null) {
			core.debug(`Issue number was not detected from the branch name: ${headBranch}`);
		} else if (inputs.issueBodyPrefix === "" && inputs.issueBodyPrefix === "") {
			core.debug('Issue prefix and suffix is not set');
		} else {
			let detectIssueNumber = detectIssueNumberMatch[0];
			core.info(`Detected issue number: ${detectIssueNumber}`);

			const issueResponse = await octokit
				.request(`GET /repos/${repo}/issues/${detectIssueNumber}`)
				.then(function (res) {
					let issueBody = res.data.body;

					if (inputs.issueBodyPrefix !== "") {
						issueBody = inputs.issueBodyPrefix + "\n" + issueBody;
					}

					if (inputs.issueBodySuffix !== "") {
						issueBody += "\n" + inputs.issueBodySuffix;
					}

					return octokit.request(`PATCH /repos/${repo}/issues/${detectIssueNumber}`, {
						body: issueBody,
					});
				})
			;

			core.info(`Response: ${issueResponse.status}`);
			if (issueResponse.status !== 200) {
				core.error('Issue body was not updated');
			}
		}

		if (inputs.prBodyPrefix !== "" || inputs.prBodySuffix !== "") {
			let prBody = github.context.payload.body
			if (inputs.prBodyPrefix !== "") {
				prBody = prBody + "\n" + inputs.prBodyPrefix;
			}

			if (inputs.prBodySuffix !== "") {
				prBody += "\n" + inputs.prBodySuffix;
			}

			const prResponse = await octokit
				.request(`PATCH /repos/${repo}/issues/${detectIssueNumber}`, {
					body: prBody,
				})
			;

			core.info(`Response: ${prResponse.status}`);
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
