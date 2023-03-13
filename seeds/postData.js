const { Post } = require('../models')

const postData = [
    {
        title: 'Techmology',
        content: 'Yo. Science. What is it all about. Techmology. What is that all about. Is it good? Or is it whack?',
        user_id: '1',
    },
    {
        title: "Man's reach exceeds his grasp",
        content: 'Do you think man will ever walk on the sun? What if they went in the winter, when the sun is cold?',
        user_id: '1',
    },
    {
        title: "Elon Musk reportedly wants to be his employees' landlord",
        content: 'Elon Musk is reportedly attempting to build a company town where Tesla, Boring and SpaceX workers might live. The mooted town, which is around 35 miles away from Austin, Texas, would likely be called Snailbrook, The Wall Street Journal reports.',
        user_id: '2',
    },
    {
        title: 'Next.js Pros and Cons',
        content: "eCommerce sites, for example, need to be super fast because that's one of the signals Google looks at when determining how to rank a site on the search results page. This is a perfect use case for static site generation. However, product pages also need to stay up to date so they show how many products are available for purchase to avoid overselling something with no stock. This situation better suits server-side rendering or client-side fetching.",
        user_id: '3',
    },
    {
        title: 'What is Underscore.js?',
        content: 'Underscore is a JavaScript utility library that provides various functions for typical programming tasks. It was created in 2009 by Jeremy Askenas and release with an MIT license. Now, Lodash has overtaken it.',
        user_id: '4',
    },
];


const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;