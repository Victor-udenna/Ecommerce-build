import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        backgroundColor: 'white',
        color: 'black',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Not Found</h2>
      <p style={{ marginBottom: '16px' }}>Could not find requested resource</p>
      <Link href="/" style={{ color: 'black', textDecoration: 'underline' }}>
        Return Home
      </Link>
    </div>
  );
}
