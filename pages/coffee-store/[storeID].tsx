import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import styles from "../../styles/coffee-stores.module.css";

import coffeeStoresData from "../../data/coffee-stores.json";
import { coffeeStoreType } from "../../data.types";

export function getStaticProps(staticProps: any) {
  const { params } = staticProps;
  console.log(staticProps);
  return {
    props: {
      coffeeStore: coffeeStoresData.find(
        (coffeeStore) => coffeeStore.id.toString() === params.storeID
      ),
    },
  };
}

export function getStaticPaths() {
  const paths = coffeeStoresData.map((coffeeStore) => {
    return {
      params: {
        storeID: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

interface Props {
  coffeeStore: coffeeStoreType;
}

const CoffeeStore: React.FC<Props> = ({ coffeeStore }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { address, name, neighbourhood } = coffeeStore;

  console.log(coffeeStore);

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      {router.query.storeID}
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <Link href="/coffee-store/dynamic">
        <a>Go to dynamic</a>
      </Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </div>
  );
};

export default CoffeeStore;
