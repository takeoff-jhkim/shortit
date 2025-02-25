import { useRef, useState } from 'react';
import Image from 'next/image';
import axios from '@/lib/axios';
import styles from '@/styles/Home.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const inputRef = useRef();

  function handleChange(e) {
    setUrl(e.target.value);
  }

  async function handleCreate(e) {
    e.preventDefault();
    const res = await axios.post('/short-links/', {
      title: url,
      url,
    });
    const newShortUrl = res.data.shortUrl;
    setShortUrl(newShortUrl);
  }

  async function handleCopy(e) {
    e.preventDefault();
    inputRef.current.select();
    const text = inputRef.current.value;
    await copyToClipboard(text);
    alert('복사했습니다. ctrl + v로 붙여넣으세요');
  }

  return (
    <>
      <style jsx global>{`
        body {
          background-color: #2d2c34;
          color: #fafafc;
        }
      `}</style>
      <div className={styles.home}>
        {/* <Image
          src={cutUrlImage}
          alt="가위로 주소 자르기"
          width={200}
          height={140}
        /> */}
        <div className={styles.intro}>
          <h1 className={styles.title}>주소 저장해보자</h1>
          <p className={styles.description}>
            주소입력해보이소
          </p>
        </div>
        <form className={styles.form} onSubmit={handleCreate}>
          <Input className={styles.input} value={url} onChange={handleChange} />
          <Button className={styles.button} disabled={!url}>
            저장
          </Button>
        </form>
        {shortUrl && (
          <form className={styles.form} onSubmit={handleCopy}>
            <Input
              className={`${styles.input} ${styles.shortUrl}`}
              readOnly
              value={`${process.env.NEXT_PUBLIC_BASE_URL}/${shortUrl}`}
              ref={inputRef}
            />
            <Button className={styles.button} variant="secondary">
              복사하기
            </Button>
          </form>
        )}
      </div>
    </>
  );
}