<script lang="ts">
  import { login, setToken } from "$lib/api";
  import type { LoginResponse } from "$lib/types";

  let email: string = "";
  let password: string = "";

  let errorMessage: string = "";
  let successMessage: string = "";

  async function handleLogin(event: Event) {
    event.preventDefault();
    errorMessage = "";
    successMessage = "";

    try {
      const response: LoginResponse = await login(email, password);
      if(response && response.token) {
        setToken(response.token);
        successMessage = "Login successful"
      } else {
        errorMessage = "No token recieved from server..";
      }
    } catch (err) {
      errorMessage = err instanceof Error ? err.message : "A unknown error occoured during authentication process";
    }
  }
</script>

<div class="card p-4">
  <form on:submit|preventDefault={handleLogin}>
    <label class="label">
      <span>Email</span>
      <input class="input" type="email" placeholder="user@example.com" bind:value={email} required/>
    </label>
    <label class="label">
      <span>Input</span>
      <input class="input" type="password" placeholder="************" bind:value={password} required/>
    </label>
    <button type="submit" class="btn-icon variant-filled">Login</button>
  </form>
</div>

{#if successMessage}
  <p style="color: green;">{successMessage}</p>
{/if}

{#if errorMessage}
  <p style="color: red;">{errorMessage}</p>
{/if}
