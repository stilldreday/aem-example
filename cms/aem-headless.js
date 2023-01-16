import AEMHeadless from '@adobe/aem-headless-client-js';


/**
 * This file defines a singleton that exposes AEM concerns to the rest of the app.
 * This includes:
 * - getters that invoke AEM GraphQL persisted queries
 * - helper functions for resources, such as images, that need to be served from AEM
 */
class AemHeadlessClient {

  /**
   * Create an instance of the AEM Headles Client for JS used to communicate with AEM Headless GraphQL endpoints.
   * "/content/cq:graphql/audired/endpoint.json", //
   * process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT
   * @param {*} serviceURL the AEM HOST this Next.js app will connect to.
   */
  constructor({ serviceURL, endpoint }) {
    this.aemHeadlessClient = new AEMHeadless({
      serviceURL: serviceURL,
      endpoint: endpoint,
      auth: this._getAuth(),
      fetch: fetch
    });
  }

  /**
   * Convenience method for turning auth schemes specified in the .env.* files into auth signatures recognized by the AEM Headless client for JS.
   * @returns a valid auth object based on env variables
   */
  _getAuth() {
    let auth;

    if (process.env.AEM_AUTH_METHOD === 'basic') {
      auth = [ process.env.AEM_AUTH_USER, process.env.AEM_AUTH_PASSWORD];
    } else if (process.env.AEM_AUTH_METHOD === 'dev-token') {
      auth = process.env.AEM_AUTH_DEV_TOKEN;
    }
    
    return auth;
  }

  /**
   * Generates an absoluate URL resolvable to AEM. This is typically used for images.
   * 
   * @param {*} urlPath 
   * @returns the urlPath prefixd with the AEM service host
   */
  serveFromAem(urlPath) {
    return `${process.env.NEXT_PUBLIC_AEM_HOST}${urlPath}`;
  }

  /**
   * Invokes the 'adventures-all` persisted query using the parameterizable namespace.
   * {endpoint:process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT}
   * @returns a GraphQL response of all headlines.
   */
  async getPresistedIndex() {
    const queryHeadlinesAll = process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT + '/index';

    
    try {
      return await this.aemHeadlessClient.runPersistedQuery(queryHeadlinesAll);
    } catch(e) {
      console.error(e)
    }    
  }

  async getQueryIndex() {
    //const queryHeadlinesAll = process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT + '/index';

    try {
      return await this.aemHeadlessClient.runQuery(`
      query{
        redheadlineList{
          items{
            headline
          }
        }
        logoList{
          items{
            picture{
              ... on ImageRef{
                _authorUrl
                _publishUrl
              }
            }
          }
        }
      }
      `)
    } catch(e) {
      console.error(e)
    }    
  }

}

/**
 * Export the initialized AEM Headless client object for use in the Next.js app
 */
export default new AemHeadlessClient({serviceURL: process.env.NEXT_PUBLIC_AEM_HOST , endpoint:"/content/cq:graphql/audired/endpoint.json"});