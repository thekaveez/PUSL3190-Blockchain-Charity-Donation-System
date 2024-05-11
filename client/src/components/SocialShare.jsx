import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  GabIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
  XIcon,
} from "react-share";

const SocialShare = () => {
  const url = window.location.href;
  const title = 'Check out this campaign - '
  
  return (
    <div className="flex justify-center space-x-2">
      <FacebookShareButton url={url} title={title}>
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>

      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={40} round={true} />
      </LinkedinShareButton>

      <TwitterShareButton url={url} title={title}>
        <XIcon size={40} round={true} />
      </TwitterShareButton>

      <PinterestShareButton url={url} title={title}>
        <PinterestIcon size={40} round={true} />
      </PinterestShareButton>

      <TelegramShareButton url={url} title={title}>
        <TelegramIcon size={40} round={true} />
      </TelegramShareButton>

      <WhatsappShareButton url={url} title={title} >
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>

      <EmailShareButton url={url} title={title}>
        <EmailIcon size={40} round={true} />
      </EmailShareButton>
    </div>
  );
};

export default SocialShare;
