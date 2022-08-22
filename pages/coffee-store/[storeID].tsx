import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import cls from "classnames";

import styles from "../../styles/coffee-store.module.css";

import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { StoreContext } from "../../store/store-context";

import { isEmpty } from "../../utils";

export async function getStaticProps(staticProps: any) {
  const { params } = staticProps;

  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStore:
        coffeeStores.find(
          (coffeeStore: any) => coffeeStore.id.toString() === params.storeID
        ) || {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore: any) => {
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
  coffeeStore: any;
}

const CoffeeStore: React.FC<Props> = (initialProps) => {
  const router = useRouter();

  const id = router.query.storeID;

  const [coffeeStore, setCoffeStore] = useState(initialProps.coffeeStore);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      const findCoffeeStoreById = coffeeStores.find(
        (coffeeStore: any) => coffeeStore.id.toString() === id
      );
      console.log(findCoffeeStoreById);
      if (coffeeStores.length > 0) {
        setCoffeStore(findCoffeeStoreById);
      }
    }
  }, [id]);

  const handleUpVoteButton = () => console.log("Handle upvote");

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { address, neighborhood, name, imgUrl } = coffeeStore;

  console.log(coffeeStore);

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <p className={styles.name}>{name}</p>
          </div>

          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt="location"
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width="24"
                height="24"
                alt="location"
              />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}

          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="location"
            />
            <p className={styles.text}>{1}</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpVoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
//fsq34IcrGmxp+1ZQnl/suODH1maN2QThuBfq/ZDinvpsApQ=
