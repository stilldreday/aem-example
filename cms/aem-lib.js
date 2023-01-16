import HeadlessClient from "@adobe/aio-lib-headless-crud"


    const client = HeadlessClient.init({
        serviceURL: process.env.NEXT_PUBLIC_AEM_HOST,
        endpoint: "/content/cq:graphql/audired/endpoint.json",
        auth: process.env.AEM_AUTH_DEV_TOKEN
    })

  

    async function getBetaQueryIndex(){
        //const queryHeadlinesAll = process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT + '/index';
    
        try {
          return (await client).getFragments(`
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

export default getBetaQueryIndex

