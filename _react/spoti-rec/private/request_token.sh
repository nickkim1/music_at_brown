# https://developer.spotify.com/documentation/web-api/tutorials/getting-started#request-an-access-token
# ** remember to .gitignore this dir

curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials&client_id=774dc15a55b64ea6b612c6ab1cc7b017&client_secret=94c10dc6b6bf4611908cd02b230c30d3"

# example: each token only valid for 1hr
# {"access_token":"BQCERov-WwIPjFaHeqw9U7_8pT4jpH0GfZMcA6dDQvUkaGki000C4oTqvx4scPBrUNuLIuFN3fRMFefLfXOYw613_LDQ0Ju60TRgq9XH9mEuv2cuZco","token_type":"Bearer","expires_in":3600}