import { Box, Typography } from '@mui/material'
import React from 'react'

const AboutUs = () => {
    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: { sm: '100%', md: '60%' }, mt: 5 }}>
                <Typography variant='h5' fontWeight="bold">Who we are</Typography>
                <Typography variant='body1'>Urban Cap is a technology platform offering a variety of services at home. Customers use our platform to book services such as beauty treatments, haircuts, massage therapy, cleaning, plumbing, carpentry, appliance repair, painting etc. These services are delivered in the comfort of their home and at a time of their choosing. We promise our customers a high quality, standardised and reliable service experience. To fulfill this promise, we work closely with our hand-picked service partners, enabling them with technology, training, products, tools, financing, insurance and brand, helping them succeed and deliver on this promise.
                    Our Vision: Empower millions of professionals worldwide to deliver services at home like never experienced before</Typography>
            </Box>
        </Box>
    )
}

export default AboutUs