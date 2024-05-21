import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button"
import { ArrowRightIcon } from "@radix-ui/react-icons"

const Navbar = () => {
    const user = undefined
    const isAdmin = false
    return (
        <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b border-zinc-200">
                    <Link href="/" className="flex z-40 font-semibold">
                        case<span className="text-purple-600">Zett</span>
                    </Link>

                    <div className="h-full flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link href='/api/auth/logout' className={buttonVariants({
                                    size: 'sm',
                                    variant: 'ghost',
                                })}>
                                    Sign out
                                </Link>
                                {isAdmin ?
                                    <Link href='/api/auth/logout' className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost',
                                    })}>
                                        Dashboard
                                    </Link> :
                                    null
                                }
                                <Link href='/configure/upload' className={buttonVariants({
                                    size: 'sm',
                                    className: 'hidden sm:flex items-center gap-1',
                                })}>
                                    Create case
                                    <ArrowRightIcon className="ml-1.5 w-5 h-5"/>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href='/api/auth/register' className={buttonVariants({
                                    size: 'sm',
                                    variant: 'ghost',
                                })}>
                                    Sign up
                                </Link>
                                
                                <Link href='/api/auth/login' className={buttonVariants({
                                    size: 'sm',
                                    className: 'hidden sm:flex items-center gap-1',
                                })}>
                                    Login
                                </Link>

                                <div className="w-px h-8 hidden sm:block bg-zinc-200" />
                                <Link href='/configure/upload' className={buttonVariants({
                                    size: 'sm',
                                    className: 'hidden sm:flex items-center gap-1',
                                })}>
                                    Create case
                                    <ArrowRightIcon className="ml-1.5 w-5 h-5"/>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default Navbar