module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 456:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __nccwpck_require__) => {

const core = __nccwpck_require__(105);
const github = __nccwpck_require__(82);

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


		// if (matchHeadBranch) {
		// 	const headBranchName = github.context.payload.pull_request.head.ref;
		// 	const headBranch = inputs.lowercaseBranch ? headBranchName.toLowerCase() : headBranchName;
		// 	core.info(`Head branch: ${headBranch}`);
		//
		// 	const headMatches = headBranch.match(new RegExp(headBranchRegex));
		// 	if (!headMatches) {
		// 		core.setFailed('Head branch name does not match given regex');
		// 		return;
		// 	}
		//
		// 	matches.headMatch = headMatches[0];
		// 	core.info(`Matched head branch text: ${matches.headMatch}`);
		//
		// 	core.setOutput('headMatch', matches.headMatch);
		// }

		// const request = {
		// 	owner: github.context.repo.owner,
		// 	repo: github.context.repo.repo,
		// 	pull_number: github.context.payload.pull_request.number,
		// }
		//
		// const upperCase = (upperCase, text) => upperCase ? text.toUpperCase() : text;
		//
		// const title = github.context.payload.pull_request.title || '';
		// const processedTitleText = inputs.titleTemplate
		// 	.replace(baseTokenRegex, upperCase(inputs.titleUppercaseBaseMatch, matches.baseMatch))
		// 	.replace(headTokenRegex, upperCase(inputs.titleUppercaseHeadMatch, matches.headMatch));
		// core.info(`Processed title text: ${processedTitleText}`);
		//
		// const updateTitle = ({
		// 	prefix: !title.toLowerCase().startsWith(processedTitleText.toLowerCase()),
		// 	suffix: !title.toLowerCase().endsWith(processedTitleText.toLowerCase()),
		// 	replace: title.toLowerCase() !== processedTitleText.toLowerCase(),
		// })[inputs.titleUpdateAction] || false;
		//
		// core.setOutput('titleUpdated', updateTitle.toString());
		//
		// if (updateTitle) {
		// 	request.title = ({
		// 		prefix: processedTitleText.concat(inputs.titleInsertSpace ? ' ': '', title),
		// 		suffix: title.concat(inputs.titleInsertSpace ? ' ': '', processedTitleText),
		// 		replace: processedTitleText,
		// 	})[inputs.titleUpdateAction];
		// 	core.info(`New title: ${request.title}`);
		// } else {
		// 	core.warning('No updates were made to PR title');
		// }
		//
		// const body = github.context.payload.pull_request.body || '';
		// const processedBodyText = inputs.bodyTemplate
		// 	.replace(baseTokenRegex, upperCase(inputs.bodyUppercaseBaseMatch, matches.baseMatch))
		// 	.replace(headTokenRegex, upperCase(inputs.bodyUppercaseHeadMatch, matches.headMatch));
		// core.info(`Processed body text: ${processedBodyText}`);
		//
		// const updateBody = ({
		// 	prefix: !body.toLowerCase().startsWith(processedBodyText.toLowerCase()),
		// 	suffix: !body.toLowerCase().endsWith(processedBodyText.toLowerCase()),
		// 	replace: body.toLowerCase() !== processedBodyText.toLowerCase(),
		// })[inputs.bodyUpdateAction] || false;
		//
		// core.setOutput('bodyUpdated', updateBody.toString());
		//
		// if (updateBody) {
		// 	request.body = ({
		// 		prefix: processedBodyText.concat('\n'.repeat(inputs.bodyNewlineCount), body),
		// 		suffix: body.concat('\n'.repeat(inputs.bodyNewlineCount), processedBodyText),
		// 		replace: processedBodyText,
		// 	})[inputs.bodyUpdateAction];
		// 	core.debug(`New body: ${request.body}`);
		// } else {
		// 	core.warning('No updates were made to PR body');
		// }
		//
		// if (!updateTitle && !updateBody) {
		// 	return;
		// }
		//
		// const octokit = github.getOctokit(inputs.token);
		// const response = await octokit.pulls.update(request);
		//
		// core.info(`Response: ${response.status}`);
		// if (response.status !== 200) {
		// 	core.error('Updating the pull request has failed');
		// }
	}
	catch (error) {
		core.error(error);
		core.setFailed(error.message);
	}
}

run()


/***/ }),

/***/ 105:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 82:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__nccwpck_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __nccwpck_require__(456);
/******/ })()
;