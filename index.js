const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
	// npx ncc build index.js -o dist/
	try {
		const inputs = {
			token: core.getInput('repo-token', {required: true}),
			prAdditional: core.getInput('pr-additional'),
			issueAdditional: core.getInput('pr-additional'),
		}

		let headBranch = github.context.payload.pull_request.head.ref;
		let detectIssueNumber = baseBranch.match('\d+');

		core.info(`Head branch: ${headBranch}`);

		if (detectIssueNumber !== NULL) {
			core.info(`Detected issue number: ${detectIssueNumber[0]}`);
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
