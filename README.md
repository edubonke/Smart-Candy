# Smart Candy — independent redesign concept

Standalone React/Vite storefront based on the supplied Google AI Studio export. It is not connected to the official Smart Candy site. All product details, stock indicators, prices and delivery or rental estimates in the prototype are illustrative. Quote forms run locally and do not send data, reserve stock, take payments, or place real orders. The official store remains unchanged.

## Local development

1. Install dependencies: `npm install`
2. Run: `npm run dev`
3. Check types: `npm run lint`
4. Run commerce tests: `npm test`
5. Build: `npm run build`

No AI keys or backend credentials are needed for the storefront concept.

## Deploy to GitHub Pages

1. Create a repository named `Smart-Candy` under `edubonke`, using `main` as the default branch.
2. Commit the contents of this project to `main`, including `.github/workflows/pages.yml`.
3. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions** as the publishing source.
4. Open **Actions → Build and deploy to GitHub Pages**. Use **Run workflow** to deploy if the initial push occurred before Pages was enabled.
5. Use the deployment URL reported by the workflow when it succeeds.

The static build uses relative paths so images, styles, and scripts work under the repository subpath. The workflow runs TypeScript validation and commerce tests before deploying. The public concept remains marked as independent, illustrative, and non-transactional; keep those notices visible.
