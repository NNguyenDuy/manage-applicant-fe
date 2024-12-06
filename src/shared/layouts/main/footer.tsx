'use client'

import Link from 'next/link'
import { PATHS } from './routes'
import {
    FacebookOutlined,
    LinkedinOutlined,
    TwitterOutlined,
    InstagramOutlined,
    YoutubeOutlined
} from '@ant-design/icons'

export const Footer = () => {
    const CURRENT_YEAR = new Date().getFullYear();

    const socialLinks = [
        { icon: <FacebookOutlined />, href: "https://facebook.com", color: "text-blue-600" },
        { icon: <LinkedinOutlined />, href: "https://linkedin.com", color: "text-blue-800" },
        { icon: <TwitterOutlined />, href: "https://twitter.com", color: "text-sky-500" },
        { icon: <InstagramOutlined />, href: "https://instagram.com", color: "text-pink-600" },
        { icon: <YoutubeOutlined />, href: "https://youtube.com", color: "text-red-600" }
    ]

    return (
        <footer className="bg-gradient-to-r from-green-50 to-green-100 py-12">
            <div className="container mx-auto px-4 text-center">
                <nav className="mb-6 space-x-4">
                    {PATHS.HOME.map((item, index) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className="text-gray-700 hover:text-green-600 transition"
                        >
                            {item.name}
                            {index < PATHS.HOME.length - 1 && <span className="mx-2 text-gray-300">|</span>}
                        </Link>
                    ))}
                </nav>

                <div className="flex justify-center space-x-6 mb-6">
                    {socialLinks.map((social, index) => (
                        <Link
                            key={index}
                            href={social.href}
                            target="_blank"
                            className={`text-3xl ${social.color} hover:opacity-75 transition`}
                        >
                            {social.icon}
                        </Link>
                    ))}
                </div>

                <div className="text-gray-600">
                    <p className="mb-2">© {CURRENT_YEAR} JobCV LLC. All Rights Reserved.</p>
                    <p className="text-sm">
                        <Link href="/privacy" className="hover:text-green-600 mr-4">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-green-600">Terms of Service</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}