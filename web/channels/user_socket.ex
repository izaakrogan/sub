defmodule Discuss.UserSocket do
  use Phoenix.Socket

  # 2 user_socket ROUTES THE SOCKET CONNECTION TO comments_channel
  channel "comments:*", Discuss.CommentsChannel

  transport :websocket, Phoenix.Transports.WebSocket

  def connect(%{"token" => token}, socket) do
    case Phoenix.Token.verify(socket, "key", token) do
      {:ok, user_id} ->
        socket = assign(socket, :user_id, user_id)
        {:ok, socket}
      {:error, _error} ->
        :error
    end
    {:ok, socket}
  end

  def id(_socket), do: nil
end
