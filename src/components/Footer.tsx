import Container from '@/components/Container'

const Footer = () => {
    return (
        <header className='mt-12 mb-8 flex justify-between gap-4'>
            <Container>
                <p className='text-sm'>
                    InvoicePedia &copy; {new Date().getFullYear()}
                </p>
                <p className='text-sm'>
                    Created by Next.js 15, Xata and Clerk
                </p>
            </Container>
        </header>
    )
}

export default Footer