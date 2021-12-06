class Api::V1::UserController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :login_required, only: [:search]

    def create
        @default_pp_colors = ['#9C27B0', '#2196F3', '#009688', '#FFEB3B']
        puts(params)
        @user = User.new(user_params)
        @user.default_pp_color = @default_pp_colors.sample

        if @user.save
            render json: @user, status: :created
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    def search
        if params['username'].length == 0
            render json: [], status: :ok
        else
            render json: User.where('first_name LIKE ?', "%#{params['username']}%"), status: :ok
        end
    end

    def login
        @matchedUser = User.find_by(email: params['email'], password: params['password'])

        if @matchedUser
            render json: JWT.encode(@matchedUser.to_json, hmac_secret(), 'HS256'), status: :ok
        else
            render json: {}, status: :forbidden
        end
    end

    private
    def user_params
        params.permit(:first_name, :last_name, :email, :password)
        end

end