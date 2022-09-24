import React from 'react';
import type {AppProps} from 'next/app';
import Head from 'next/head';

import {MantineProvider} from '@mantine/core';

// import {FeatureToggleProvider} from '~/modules/feature-toggle/contexts/feature-toggle-context';

const MyApp = ({Component, pageProps}: AppProps) => (
  // <FeatureToggleProvider>
  // </FeatureToggleProvider>
  <>
    <Head>
      <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
    </Head>
    <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS>
      <Component {...pageProps} />
    </MantineProvider>
  </>
);

export default MyApp;
