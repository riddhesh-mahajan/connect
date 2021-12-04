class Api::V1::PostController < ActionController::API
  def create
    @post = User.find_by(id: 1).posts.new(post_params)
    @post.likes = 0

    if @post.save
        render json: @post, status: :created
    else
        render json: @post.errors, status: :unprocessable_entity
    end
  end

  def like
    @post = Post.find(params['post_id'])
    @post.likes = @post.likes + 1

    if @post.save
        render json: @post, status: :ok
    else
        render json: @post.errors, status: :unprocessable_entity
    end
  end
  
  private
  def post_params
      params.permit(:content)
      end
end
