import React from 'react';
import bg from '../../../assets/images/appointment.png'
import ButtonPrimary from '../../../components/ButtonPrimary/ButtonPrimary';
import emailjs from 'emailjs-com';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, process.env.REACT_APP_PUBLIC_KEY)
          .then((result) => {
            //   console.log(result);
              if(result.text === 'OK'){
                toast.success('Message successfully sent')
                e.target.reset()
              }
          }, (error) => {
              console.log(error.text);
          });
      };

    return (
        <section className='py-16' style={{
            background: `url(${bg})`
        }}>
            <div className='text-center'>
                <h3 className='text-xl text-primary font-bold mb-2'>OUR SERVICES</h3>
                <h2 className='text-4xl mb-16 text-white'>Services We Provide</h2>
            </div>
            <div className="card lg:w-5/12 mx-auto">
                <div className="card-body">
                    <form ref={form}  onSubmit={sendEmail}>
                        <div className="form-control mb-5">
                            <input name='user_name' type="text" placeholder="Name" className="input input-bordered" />
                        </div>
                        <div className="form-control mb-5">
                            <input name='user_email' type="email" placeholder="Email Address" className="input input-bordered" />
                        </div>
                        <div className="form-control mb-5">
                            <input name="subject" type="text" placeholder="Subject" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <textarea name='message' type="text" placeholder="Your Message" className="input input-bordered h-32 p-2" />
                        </div>
                        <div className="form-control mt-8">
                            <ButtonPrimary type="submit">Submit</ButtonPrimary>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;