import React from 'react'
import { Link } from 'react-router-dom';
import { useUserAuth } from '../.././components/context/UserAuthContext';

function Footer() {
    const { user } = useUserAuth();
    return (
        <footer className="text-gray-600 body-font bg-gradient-to-br from-[#2193b0] via-[#6dd5ed] to-[#093676] ">
            <div className="px-5 py-8 mx-auto bg-main/5">
                <div className="flex flex-wrap text-center md:text-left">
                    <div className="w-full px-4 lg:w-1/5">
                        <h2 className="mb-3 text-sm font-bold tracking-widest text-white title-font">
                            LINKS
                        </h2>
                        <nav className="mb-5 list-none">
                            <li>
                                {user ? <Link onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }} to="/dashboard" className="text-white hover:text-main/100">Your Space</Link> : <Link onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }} to="/getaccess" className="text-white hover:text-main/100">Get Access</Link>}
                            </li>
                            <li>
                                <Link onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }} to="https://santechh.vercel.app" className="text-white hover:text-main/100">SanTech</Link>
                            </li>
                        </nav>
                    </div>
                    <div className="w-full px-4 lg:w-1/5">
                        <h2 className="mb-3 text-sm font-bold tracking-widest text-white title-font">
                            COMPANY
                        </h2>
                        <nav className="mb-5 list-none ">
                            <li>
                                <Link onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }} to="/need-spark" className="text-white lg:hover:text-main/100">Need a Spark?</Link>
                            </li>
                            <li>
                                <Link onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }} to="/terms-of-use" className="text-white hover:text-main/100">Terms Of Use</Link>
                            </li>
                        </nav>
                    </div>
                    <div className="w-full px-4 lg:w-3/5">
                        <h2 className="mb-3 text-sm font-bold tracking-widest text-white title-font">
                            SUBSCRIBE
                        </h2>
                        <form
                            action="https://formsubmit.co/0b4ee2cd42a0e78f61eb1715e33bb409"
                            method="POST"
                            className="flex flex-col items-center justify-center gap-3 md:flex-row lg:items-end"
                        >
                            <input
                                type="text"
                                id="footer-field"
                                name="footer-field"
                                required
                                autoComplete={"email"}
                                placeholder="Your Email"
                                className="w-full px-3 py-1 text-base leading-8 z-[9999999999] bg-white text-white transition-colors duration-200 ease-in-out bg-opacity-50 border rounded outline-none  border-white/10 focus:bg-transparent focus:ring-2 focus:ring-main/20 focus:border-main/80"
                            />
                            <button className="w-full px-4 py-2 bg-white border-0 rounded text-sky-600 sm:w-auto lg:px-6 focus:outline-none hover:bg-white/80">
                                Send&nbsp;Message
                            </button>
                        </form>
                        <p className="mt-2 text-sm font-medium text-white ">
                            * All details are required for communication.
                        </p>
                    </div>
                </div>
            </div>
            <div className=" z-[9999999999] bg-white/10 rounded-lg shadow-md">
                <div className="flex flex-col items-center px-5 py-6 mx-auto sm:flex-row">
                    <span onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} className="flex items-center justify-center font-medium text-white cursor-pointer title-font">
                        <img src={require("../../assets/logo192.png")} alt="" className="size-10" />
                    </span>
                    <p className="mt-4 text-sm font-medium text-white sm:ml-6 sm:mt-0 ">
                        © 2024 Webweave —
                        <Link
                            to='https://santechh.vercel.app'
                            rel="noopener noreferrer"
                            className="ml-1 text-white"
                            target="_blank"
                        >
                            @SanTech
                        </Link>
                    </p>

                </div>
            </div>
        </footer>
    )
}

export default Footer