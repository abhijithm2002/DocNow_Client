import React, { useState } from 'react';
import { Input, Textarea, Button } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { postContactData } from '../../services/User/userService';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleSubmit = async(e) => {
       e.preventDefault();
       console.log(formData)
       try {
        const response = await postContactData(formData);
        if(response.status === 200) {
            toast.success('Message sent successfully')
            setFormData({
                name: '',
                email: '',
                message: ''
            })
        } else {
         toast.error('Failed to sent message')

        }
       } catch (error) {
         toast.error('Failed to sent message')
       }
    }

    const handleChange = (e) => {
        const {id, value} = e.target
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }))
    }
    return (
        <section className="bg-white py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                Contact Us
            </h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-800 font-serif dark:text-gray-400 sm:text-xl">
                Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
            </p>
            <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-400 font-sans"
                    >
                        Name
                    </label>
                    <Input
                        type="text"
                        id="name"
                        placeholder="John"
                        required
                        clearable
                        value={formData.name}
                        onChange={handleChange}
                        bordered
                        fullWidth
                        className="text-gray-900 dark:text-white"
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-400 font-sans"
                    >
                        email
                    </label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="name@example.com"
                        required
                        clearable
                        value={formData.email}
                        onChange={handleChange}
                        bordered
                        fullWidth
                        className="text-gray-900 dark:text-white"
                    />
                </div>
                
                <div>
                    <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-400 font-sans"
                    >
                        message
                    </label>
                    <Textarea
                        id="message"
                        placeholder="Leave a comment..."
                        rows={6}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        bordered
                        fullWidth
                        className="text-gray-900 dark:text-white"
                    />
                </div>
                <div className="flex justify-center sm:justify-start">
                    <Button
                        auto
                        shadow
                        type="submit"
                        color="primary"
                        className="sm:w-auto"
                    >
                        Send Message
                    </Button>
                </div>

            </form>
        </section>
    );
};

export default ContactPage;
