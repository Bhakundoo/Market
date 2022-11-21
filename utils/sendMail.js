import emailjs from '@emailjs/browser';

export const sendMail = (setData, formRef, setLoading, setMessage) => {
    emailjs.sendForm('service_h6wu7la', 'template_j9w9q95', formRef.current, 'SiQx2je7AK4XnD3Ny')
        .then((result) => {
            setData({
                phone: '',
                city: '',
                street: '',
            })
            setMessage({ 
                type: 'success',
                text: 'Products ordered successfully',
            })
            setLoading(false)
        }, (error) => {
            setMessage({
                type: 'error',
                text: error.text,
            })
            console.log(error.text);
            setLoading(false)
        }
    );
}
