<template>
<div class="popUpGameBanner">

    <div class="BgPosition">
        <img class="Bg" src="../assets/image/bg.png">
    </div>

    <div class="GamenamePosition">
        <div class="Gamename">名前</div>
    </div>

    <div class="SubscribedPosition">
        <div class="Subscribed">フォローしている人</div>
    </div>

    <div class="SubscriberPosition">
        <div class="Subscriber">小野優真</div>
    </div>

    <div class="FollowerPpsition">
        <div class="Follower">Follwer</div>
    </div>

    <div class="FollowerNumberPosition">
        <div class="FollowerNumber">人数</div>
    </div>

    <div class="BackButtonPosition">
        <div class="BackButton">Back</div>
    </div>
</div>
</template>

<script>
import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";

const db = firebase.firestore();

export default {
    name: 'popUpGameBanner'
}
</script>

<style lang="scss" scoped>
.popUpGameBanner{
    position: absolute;

    width: $not_banner_width;
    height: $not_banner_height;

    background-color: #ddd;

    .BgPosition{
        position: abusolute;

        width: 60px;
        height: 120px;

        top: 15px;
        right: 20px;
    
        .Bg{
        width: 100%;
        height: 100%;
        }
    }

    .GamenamePosition{
        position: absolute;

        top: 20px;
        left: 20px;

        .Gamename{
            position: absolute;

            width: 100px;
            height: 50px;
        }
    }

    .SubscribedPosition{
        position: absolute;

        top: 40px;
        left: 20px;
    
        .Subscribed{
            width: 100px;
            height: 50px;

        }
    }

    .SubscriberPosition{
        position: absolute;

        top: 40px;
        left: 40px;

        .Subscriber{
            position: absolute;

            width: 100px;
            height: 50px;
        }
    }

    .FollowerPpsition{
        position: absolute;

        top: 20px;
        right: 60px;

        .Follower{
            position: absolute;

            width: 100px;
            height: 50px;
        }
    }

    .FollowerNumberPosition{
        position: absolute;

        top: 20px;
        right: 30px;

        .FollowerNumber{
            position: absolute;

            width: 100px;
            height: 50px;
        }
    }

    .BackButtonPosition{
        position: absolute;

        bottom: 50px;
        right: 30px;

        .BackButton{
            position: absolute;

            width: 100px;
            height:50px;
        }
    }
}
</style>
