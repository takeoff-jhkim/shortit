import { useRef, useState } from 'react';
import axios from '@/lib/axios';
import styles from '@/styles/Home.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';
import dbConnect from '@/db/dbConnect';
import ShortLink from '@/db/models/ShortLink';

export async function getServerSideProps() {
  await dbConnect();
  const shortLink = await ShortLink.find();

  const initialMemo = shortLink.map(link => link.title).join('\n')

  return {
    props: {
      initialMemo
    }
  }
}

export default function Home({ initialMemo }) {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const inputRef = useRef();
  const [memo, setMemo] = useState(initialMemo);

  function handleChange(e) {
    setUrl(e.target.value);
  }

  async function handleSearch() {
    try {
      const res = await axios.get('/short-links/');
      const totalMemo = res.data.map(item => item.title).join('\n');
      setMemo(totalMemo);
    } catch (e) {
      console.error('데이터 불러오기 실패: ', e);
      setMemo('조회 중 오류가 발생했습니다.');
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    const res = await axios.post('/short-links/', {
      title: url,
      url,
    });
    const newShortUrl = res.data.shortUrl;
    setShortUrl(newShortUrl);
    handleSearch()
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
          <h1 className={styles.title}>메모를 저장해보자</h1>
          <p className={styles.description}>
            아무거나 입력해보이소
          </p>
        </div>
        <form className={styles.form} onSubmit={handleCreate}>
          <Input className={styles.input} value={url} onChange={handleChange} />
          <Button className={styles.button} disabled={!url}>
            저장
          </Button>
        </form>
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <Button>조회</Button>
        </form>
        {memo && (
          <div className={styles.description}>
            <pre>{memo}</pre>
          </div>
        )}
      </div >
    </>
  );
}