import React from 'react'

interface Props {
    imgSource?:string|null;
    tweetUrl?:string|null;
    tweetText?:string|null;
    videoSource?:string|null;
    isApproved:boolean;
    
}

function Tweet(props:Props) {
    const {
        imgSource,
        tweetUrl,
        tweetText,
        videoSource,
        isApproved,
    } = props;
    

  return (
    <div className='flex flex-col items-center w-3/4 text-xs gap-1'>
    <a>url ewentualnie</a>
    <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h1>
    {imgSource?<img src={imgSource}/>:''}
    <div id='tweetButtonContainer' className='flex flex-row gap-3'>
        <button>Approve</button>
        <button>Edit</button>
        <button>Decline</button>
    </div>
    </div>
  )
}

export default Tweet