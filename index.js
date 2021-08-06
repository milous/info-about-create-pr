const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
	try {
		const inputs = {
			token: core.getInput('repo-token', {required: true}),
			prAdditional: core.getInput('pr-additional'),
			issueAdditional: core.getInput('issue-additional'),
		}

		const octokit = new github.getOctokit(inputs.token);
		const repo = github.context.payload.repository.full_name;

		let headBranch = github.context.payload.pull_request.head.ref;
		let detectIssueNumberMatch = headBranch.match(/\d+/g);

		if (detectIssueNumberMatch !== null) {
			let detectIssueNumber = detectIssueNumberMatch[0];
			core.info(`Detected issue number: ${detectIssueNumber}`);

			if (inputs.issueAdditional !== "") {
				// const issueRequest = {
				// 	owner: github.context.repo.owner,
				// 	repo: github.context.repo.repo,
				// 	pull_number: github.context.payload.pull_request.number,
				// }
				//
				// issueRequest.body =
				//
				// const issueResponse = await octokit.pulls.update(issueRequest);
				//
				// core.info(`Response: ${issueResponse.status}`);
				// if (response.status !== 200) {
				// 	core.error('Updating the pull request has failed');
				// }

				const issueResponse = await octokit
					.request(`GET /repos/${repo}/issues/${detectIssueNumber}`)
					.then(function (res) {
						let issueBody = res.data.body;

						issueBody += "\n" + inputs.issueAdditional;

						octokit.request(`PATCH /repos/${repo}/issues/${detectIssueNumber}`, {
							body: issueBody,
						});
					})
				;

				core.info(`Response: ${issueResponse.status}`);
			}
		}

		core.info(`Issue additional text: ${inputs.issueAdditional}`);
		core.info(`PR additional text: ${inputs.prAdditional}`);
	}
	catch (error) {
		core.error(error);
		core.setFailed(error.message);
	}
}

run()
