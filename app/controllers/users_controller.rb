  class UsersController < ApplicationController

    def edit
    end
  
    def update
      if current_user.update(user_params)
        redirect_to root_path
      else
        render :edit
# redirect_toで書くと入力していた内容がそのまま残ってしまうため、renderでeditに戻っている。
      end
    end

    def index
      @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: current_user)
      respond_to do |format|
        format.json
      end
    end
  
    private
  
    def user_params
      params.require(:user).permit(:name, :email)
    end
  end
