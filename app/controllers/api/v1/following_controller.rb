class Api::V1::FollowingController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :login_required

  def following
    @myFollowingIds = User.find($userData["id"]).followings.pluck('followed_user_id')
    @myFollowing = User.where(id: @myFollowingIds)

    render json: @myFollowing, status: :ok
  end

  def create
    if Following.find_by(user_id: $userData["id"], followed_user_id:params['followed_user_id']) == nil
      @following = Following.new(following_params)
      @following.user_id = $userData["id"]

      if @following.save
          render json: @following.followed_user, status: :created
      else
          render json: @following.errors, status: :unprocessable_entity
      end
    else
      render json: nil, status: :unprocessable_entity
    end
  end

  def destroy
    @following = Following.find_by(user_id: $userData["id"], followed_user_id: params['id'])
    
    if @following.destroy
        render json: {}, status: :ok
    else
        render json: @following.errors, status: :unprocessable_entity
    end
  end

  private
  def following_params
      params.permit(:followed_user_id)
      end

end
