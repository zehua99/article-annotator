# Article Annotator
The frontend for the multi-user article annotating tool. **[Demo](https://annotator.zehua.li)**

![image](https://user-images.githubusercontent.com/7604366/94355604-62837500-0053-11eb-83ea-a70f379ac4e4.png)
![image](https://user-images.githubusercontent.com/7604366/94355615-81820700-0053-11eb-9545-fe309e520eb8.png)

## Run this project
You can host the frontend on GitHub Page, although you do need a server to host the backend.

1. Fork this project to your account.
2. Install [Node.js](https://nodejs.org/en/) >= v12.16.3 and [Yarn](https://yarnpkg.com/getting-started/install) >= 1.22.4.
3. Run `yarn install` under the project’s root directory.
4. In `package.json`, change the value of `homepage` to your GitHub Page root URL. If you are not using custom domain, the value should be `https://{GITHUB_USERNAME}.github.io/article-annotator`. Otherwise it should be your domain.
5. Delete `public/CNAME` if you are not using custom domain. Otherwise change the file content to your domain.
6. Update the values in `src/config.ts` accordingly.
7. Run `yarn publish` under the project’s root directory.
8. Enable GitHub Page in your project setting page.

To view annotations made by other users, open your browser DevTools and run `window.displayOthersAnnotation()` in the console.
