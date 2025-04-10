import Head from 'next/head';

type SEOProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  structuredData?: object | null;
};

const SEO = ({
  title = 'UFC Wordle - Guess the Mystery UFC Fighter',
  description = 'Dive into the exciting world of UFC with UFC Wordle, the ultimate guessing game for MMA enthusiasts. Test your knowledge of UFC fighters by guessing the mystery fighter in a limited number of tries. Engage in a fun and challenging way to learn more about your favorite UFC stars and their achievements.',
  url = 'www.ufcwordle.com',
  image = '/wordle.png',
  type = 'website',
  structuredData = null,
}: SEOProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  );
};

export default SEO;
