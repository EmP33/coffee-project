import Link from "next/link";
import Image from "next/image";
import cls from "classnames";

import styles from "./card.module.css";

interface Props {
  name: string;
  imgURL: string;
  href: string;
  className?: string;
}

const Card: React.FC<Props> = ({ name, imgURL, href }) => {
  return (
    <Link href={href}>
      <a className={styles.cardLink}>
        <div className={cls("glass", styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              className={styles.cardImage}
              src={imgURL}
              width={260}
              height={160}
              alt={name}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
