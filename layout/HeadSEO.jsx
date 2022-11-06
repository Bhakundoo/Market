import Head from "next/head"

const HeadSeo = ({ title,description,children }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="description" content={description} />
    
            <link rel="icon" href="/favicon.ico" />
            <link rel='manifest' href='/manifest.json' /> 

            {children}
        </Head>
    )
}

export default HeadSeo