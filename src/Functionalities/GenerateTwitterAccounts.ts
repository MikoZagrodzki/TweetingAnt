import {getUserNameUsedForTweetsAllBatches,getUserNameUsedForTweets,getUserContentAllBatches,getTimeToTweetsAllBatches,getUserContent,getTimeToTweets,getTimeToRetweetsAllBatches,getTimeToRetweets,getTimeToLikesAllBatches,getTimeToLikes,getTimeToComments,getTimeToCommentsAllBatches,getLoginDataAllBatches,getLoginData,getIntensivity,getIntensivityAllBatches,getIntensivityByEmail, getLoginDataFromEmail, getUserContentByEmail,getUserNameUsedForTweetsByEmail,getTimeToTweetsByEmail,getTimeToRetweetsByEmail, getTimeToLikesByEmail, getTimeToCommentsByEmail} from "../SQL";
import TwitterAccount from "../TwitterAccount";

export const generateTwitterAccounts = async (email:string) => {
  let accountsWithTwitterClass: TwitterAccount[] = [];
  const loginData = email === "admin@admin.admin" ? await getLoginData() : email === "batch@batch@batch" ? await getLoginDataAllBatches() : await getLoginDataFromEmail(email);
  const intensivity = email === "admin@admin.admin" ? await getIntensivity() : email === "batch@batch@batch" ? await getIntensivityAllBatches() : await getIntensivityByEmail(email);
  const timesToTweet = email === "admin@admin.admin" ? await getTimeToTweets() : email === "batch@batch@batch" ? await getTimeToTweetsAllBatches() : await getTimeToTweetsByEmail(email);
  const timesTolike = email === "admin@admin.admin" ? await getTimeToLikes() : email === "batch@batch@batch" ? await getTimeToLikesAllBatches() : await getTimeToLikesByEmail(email);
  const timesToRetweet = email === "admin@admin.admin" ? await getTimeToRetweets() : email === "batch@batch@batch" ? await getTimeToRetweetsAllBatches() : await getTimeToRetweetsByEmail(email);
  const timesToComment = email === "admin@admin.admin" ? await getTimeToComments() : email === "batch@batch@batch" ? await getTimeToCommentsAllBatches() : await getTimeToCommentsByEmail(email);
  const usernameForTweets = email === "admin@admin.admin" ? await getUserNameUsedForTweets() : email === "batch@batch@batch" ? await getUserNameUsedForTweetsAllBatches() : await getUserNameUsedForTweetsByEmail(email);
  const usernameForContent = email === "admin@admin.admin" ? await getUserContent() : email === "batch@batch@batch" ? await getUserContentAllBatches() : await getUserContentByEmail(email);


  loginData?.forEach((account:any) => {
    const twitterAccount = new TwitterAccount(
      account.id,
      account.email,
      account.loginnametwitter,
      account.isautomated,
      account.personality,
////////////////////////////////////////////////////////
      intensivity.find((item: any) => item.loginnametwitter === account.loginnametwitter)?.tweetsintensivity||5,
      timesToTweet.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.tweetsTime || [],
////////////////////////////////////////////////////////
      intensivity.find((item: any) => item.loginnametwitter === account.loginnametwitter)?.likesintensivity||5,
      timesTolike.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.likesTime || [],
////////////////////////////////////////////////////////
      intensivity.find((item: any) => item.loginnametwitter === account.loginnametwitter)?.retweetsintensivity||5,
      timesToRetweet.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.retweetsTime || [],
////////////////////////////////////////////////////////
      intensivity.find((item: any) => item.loginnametwitter === account.loginnametwitter)?.commentsintensivity||5,
      timesToComment.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.commentsTime || [],
////////////////////////////////////////////////////////
      usernameForTweets.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.usercontent || [],
      usernameForContent.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.usercontent || [],
////////////////////////////////////////////////////////
    );
    accountsWithTwitterClass.push(twitterAccount);
  });
console.log(accountsWithTwitterClass)
  return accountsWithTwitterClass;
};

export default generateTwitterAccounts;

