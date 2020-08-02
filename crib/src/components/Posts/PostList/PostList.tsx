import React from 'react';
import PostItem from './PostItem/PostItem'

const postText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const postText2 = "Pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Aenean euismod elementum nisi quis eleifend quam adipiscing. Mauris ultrices eros in cursus turpis massa. Nibh cras pulvinar mattis nunc sed blandit libero volutpat sed. Etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Velit sed ullamcorper morbi tincidunt";
const postText3 = "Fringilla ut morbi tincidunt augue interdum velit. Non odio euismod lacinia at quis risus. Donec ultrices tincidunt arcu non sodales neque. Urna porttitor rhoncus dolor purus. Pharetra convallis posuere morbi leo urna molestie at elementum eu. Imperdiet nulla malesuada pellentesque elit eget gravida cum. Et malesuada fames ac turpis egestas integer eget. Nunc consequat interdum varius sit amet mattis. Senectus et netus et malesuada";
const postText4 = "Tortor consequat id porta nibh venenatis cras. Sapien faucibus et molestie ac. Tincidunt dui ut ornare lectus sit amet est placerat. Enim ut sem viverra aliquet eget sit. Ac turpis egestas integer eget aliquet nibh praesent. Facilisis magna etiam tempor orci eu lobortis elementum nibh. Lectus urna duis convallis convallis tellus id interdum velit. Risus viverra adipiscing at in.";

const PostList = () => {
    return (
        <React.Fragment>
            <PostItem
                name="Andre Zekic"
                unit="221"
                likes={6}
                comments={4}
                text={postText}
                profilePicture="https://media-exp1.licdn.com/dms/image/C4E03AQEZDUl98iycDA/profile-displayphoto-shrink_400_400/0?e=1600905600&v=beta&t=16_fkwR_k1JGW3Z21F99tIs9WO0f8fmK0Iei6ZAxh3k"
            />
            <PostItem
                name="Emily Brewer"
                unit="221"
                likes={7}
                comments={8}
                text={postText2}
                image="https://i.dailymail.co.uk/i/pix/2017/07/18/14/427394C200000578-4707164-Happy_people_are_healthier_Some_65_percent_of_relevant_studies_f-m-21_1500384450707.jpg"
                profilePicture="https://media-exp1.licdn.com/dms/image/C5603AQHLMtr0-XdiUw/profile-displayphoto-shrink_400_400/0?e=1600905600&v=beta&t=vI86lqHpZsT5eOw-Us96d4-tuoo_gvuQRls8PiijPuk"
            />
            <PostItem
                name="Elon Musk"
                unit="423"
                likes={12}
                comments={16}
                text={postText3}
                profilePicture="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTY2MzU3Nzk2OTM2MjMwNTkx/elon_musk_royal_society.jpg"
            />
            <PostItem
                name="Albert Einstein"
                unit="311"
                likes={4}
                comments={2}
                text={postText4}
                profilePicture="https://1wfcdq9s2x3wr2kv21wt8he-wpengine.netdna-ssl.com/wp-content/uploads/2015/11/Albert_einstein_by_zuzahin-d5pcbug-WikiCommons-768x706.jpg"
            />
        </React.Fragment>
    );
};

export default PostList;