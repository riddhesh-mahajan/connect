class Api::V1::FollowingController < ActionController::API
  def following
    @myFollowingIds = User.find(1).followings.pluck('followed_user_id')
    @myFollowing = User.where(id: @myFollowingIds)

    render json: @myFollowing, status: :ok
  end

  def create
    @following = Following.new(following_params)
    @following.user_id = 1

    if @following.save
        render json: @following.followed_user, status: :created
    else
        render json: @following.errors, status: :unprocessable_entity
    end
  end

  private
  def following_params
      params.permit(:followed_user_id)
      end

end
