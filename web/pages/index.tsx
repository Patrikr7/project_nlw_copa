interface HomeProps{
  count: number
}

export default function Home(props: HomeProps) {
  return (
    <>
      <h1>Hello World!</h1>
      <p>Contagem: { props.count }</p>
    </>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/counts')
  const data = await response.json()

  return {
    props: {
      count: data.count
    }
  }
}