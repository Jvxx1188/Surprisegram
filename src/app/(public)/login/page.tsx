import "./globals.css";

export default function Login() {
    return <>
    <div className="flex flex-col gap-4">
    <h1 className="text-3xl font-bold">Login</h1>
    
    <form className="flex flex-col gap-4 justify-center ">
        {/*EMAIL*/}
        <div className="flex flex-col gap-4">
            <label className="text-gray-500 " htmlFor="email">Enter your email</label>
            <input className=" outline-none border-b-2 transition duration-300 focus:border-gray-700" type="email" id="email" name="email"/>
        </div>
       
        {/*PASSWORD*/}
        <div className="flex flex-col gap-4">
            <label className="text-gray-500" htmlFor="password">Enter your password</label>
            <input className=" outline-none border-b-2 transition duration-300 focus:border-gray-700" type="password" id="password" name="password"/>
        </div>
        
        <button type="submit" className="bg-green-400 w-20 p-3 rounded-xl flex justify-center ">Continue</button>
        </form>
        <p></p>
    </div>
    </>
}