class Api::V1::FeedController < ApplicationController
  def feed
    @myFollowings = User.find(1).followings.pluck('followed_user_id')
    @myFollowings.push(1)
    
    @feed = Post.where(user_id: @myFollowings)
    

    render json: @feed, status: :ok
  end
end
