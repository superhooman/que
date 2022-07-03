import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Paragraph, Title } from '@src/components/Typography';
import { HOST } from '@src/constants';
import { DefaultLayout } from '@src/layout/Default';

const Privacy = () => (
    <DefaultLayout>
        <Title level={1}>Privacy Policy for Que</Title>

        <Paragraph>At Que, accessible from {HOST}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Que and how we use it.</Paragraph>

        <Paragraph>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</Paragraph>

        <Paragraph>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Que. This policy is not applicable to any information collected offline or via channels other than this website.</Paragraph>

        <Title level={2}>Consent</Title>

        <Paragraph>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</Paragraph>

        <Title level={2}>Information we collect</Title>

        <Paragraph>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</Paragraph>
        <Paragraph>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</Paragraph>
        <Paragraph>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</Paragraph>

        <Title level={2}>How we use your information</Title>

        <Paragraph>We use the information we collect in various ways, including to:</Paragraph>

        <ul>
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
        </ul>

        <Title level={2}>Log Files</Title>

        <Paragraph>Que follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.</Paragraph>

        <Title level={2}>Cookies and Web Beacons</Title>

        <Paragraph>Like any other website, Que uses &lsquo;cookies&rsquo;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.</Paragraph>



        <Title level={2}>Advertising Partners Privacy Policies</Title>

        <Paragraph>You may consult this list to find the Privacy Policy for each of the advertising partners of Que.</Paragraph>

        <Paragraph>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Que, which are sent directly to users&apos; browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</Paragraph>

        <Paragraph>Note that Que has no access to or control over these cookies that are used by third-party advertisers.</Paragraph>

        <Title level={2}>Third Party Privacy Policies</Title>

        <Paragraph>Que&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </Paragraph>

        <Paragraph>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&apos; respective websites.</Paragraph>

        <Title level={2}>CCPA Privacy Rights (Do Not Sell My Personal Information)</Title>

        <Paragraph>Under the CCPA, among other rights, California consumers have the right to:</Paragraph>
        <Paragraph>Request that a business that collects a consumer&apos;s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</Paragraph>
        <Paragraph>Request that a business delete any personal data about the consumer that a business has collected.</Paragraph>
        <Paragraph>Request that a business that sells a consumer&apos;s personal data, not sell the consumer&apos;s personal data.</Paragraph>
        <Paragraph>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</Paragraph>

        <Title level={2}>GDPR Data Protection Rights</Title>

        <Paragraph>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</Paragraph>
        <Paragraph>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</Paragraph>
        <Paragraph>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</Paragraph>
        <Paragraph>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</Paragraph>
        <Paragraph>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</Paragraph>
        <Paragraph>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</Paragraph>
        <Paragraph>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</Paragraph>
        <Paragraph>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</Paragraph>

        <Title level={2}>Children&apos;s Information</Title>

        <Paragraph>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</Paragraph>

        <Paragraph>Que does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</Paragraph>
    </DefaultLayout>
);

export default Privacy;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale || 'en', ['common', 'create', 'errors'])),
        }
    };
};
