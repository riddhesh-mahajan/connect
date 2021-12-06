class Api::V1::FeedController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :login_required
  
  def feed
    @myFollowings = User.find($userData["id"]).followings.pluck('followed_user_id')
    @myFollowings.push($userData["id"])
    
    @feed = Post.where(user_id: @myFollowings)
    
    render json: @feed, status: :ok
  end
end
