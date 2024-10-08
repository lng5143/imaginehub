'use client'

import Link from "next/link";

export default function FooterSection() {
    return (
        <div className="flex flex-col px-32 w-full">
            <div className="flex gap-20 w-full py-10">
                <div className="flex-grow">
                    <img src="/logo/logo-dark-text.png" alt="logo" className="w-60" />
                    {/* <div className="flex gap-5">
                        <Image src="/instagram.svg" alt="instagram" width={20} height={20} />
                        <Image src="/facebook.svg" alt="facebook" width={20} height={20} />
                        <Image src="/twitter.svg" alt="twitter" width={20} height={20} />
                    </div> */}
                    <p className="text-sm">© 2024 All rights reserved.</p>
                </div>
                <div className="flex gap-10">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold">Product</h3>
                        <Link href="/pricing">Pricing</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold">Resources</h3>
                        <Link href="/blog">Blog</Link>
                    </div>
                </div>
            </div>
            <hr className="w-full border-slate-300" />
            <div className="flex gap-5 py-5 text-sm text-gray-800">
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/terms">Terms & Conditions</Link>
                <Link href="/refund">Refund Policy</Link>
            </div>
        </div>
    )
}