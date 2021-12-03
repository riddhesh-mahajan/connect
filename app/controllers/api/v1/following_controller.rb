class Api::V1::FollowingController < ActionController::API
  def following
    render json: User.find(1).followings, status: :ok
  end

  def create
    @following = Following.new(following_params)
    @following.user_id = 1

    if @following.save
        render json: @following, status: :created
    else
        render json: @following.errors, status: :unprocessable_entity
    end
  end

  private
  def following_params
      params.permit(:followed_user_id)
      end

end
