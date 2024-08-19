import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

(async () => {
    const res = await fetch("https://explodingtopics.com/topics-last-2-years");
    const text = await res.text();
    const $ = cheerio.load(text);
    const containers = $('.tileInnerContainer').toArray();
    const trends = containers.map(item => {
        const active = $(item)
       const keyword = active.find('.tileTopInfoContainer > .tileKeywordContainer > .tileKeyword').text();
       const volumeScore = active.find('.tileTopInfoContainer .scoresContainer .scoresInnerContainer .scoreTag--volume').text().trim() || 'No Data';
       const growthScore = active.find('.tileTopInfoContainer .scoresContainer .scoresInnerContainer .scoreTag.last .growth').text().trim() || 'No Data';
       const description = active.find('.tileChartContainer .tileBottomInfoContainer .tileDescription').text().trim() || 'No Data';
       return {keyword, volumeScore, growthScore, description}
    })
    console.log({trends})
})()