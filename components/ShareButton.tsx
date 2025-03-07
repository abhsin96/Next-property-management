"use client";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ShareButton = ({ property }: any) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share this Property :
      </h3>
      <div className="flex gap-4 pb-5">
        <FacebookShareButton
          url={shareUrl}
          hashtag={`${property.name} For Rent`}
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={`${property.name} For Rent`}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} title={`${property.name} For Rent`}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <EmailShareButton url={shareUrl} title={`${property.name} For Rent`}>
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
        <TelegramShareButton url={shareUrl} title={property.name}>
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>
      </div>
    </>
  );
};

export default ShareButton;
