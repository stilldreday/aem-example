import Head from 'next/head'
import Image from 'next/image'
import aemHeadlessClient from '../cms/aem-headless';

export default function Home({ headlines, logo}) {

  const sanityIoImageLoader = ( ) => {
    return logo[0].picture._authorUrl
  }

  return (
    <>
      <Head>
        <title>NEXT AEM</title>
        <meta name="description" content="NEXT App with AEM headless" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/audi-icon.ico" />
      </Head>
      <main className='flex h-screen'>
        <div className='m-auto'>
          <div className='flex justify-center py-8'>
           {console.log(logo)}
           <Image
           loader={sanityIoImageLoader}
              src="image-src"
              alt="AUDI Logo"
              width={300}
              height={100}
              priority
            />
          </div>
          {headlines.map(
            (headline, index) => {
                return (
                  <h1 key={index} className="text-center text-3xl font-bold py-4">{headline.headline}</h1>
                      );
            } 
            )}
         </div>
     
      </main>
    </>
  )

}

export async function getServerSideProps() {
  const res = await aemHeadlessClient.getQueryIndex();
  const headlines = res?.data?.redheadlineList?.items || [];
  const logo = res?.data?.logoList?.items || [];

  if (!headlines.length) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      headlines,
      logo
   
    }
  };
}

