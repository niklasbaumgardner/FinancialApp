from finapp import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)

# export SQLALCHEMY_DATABASE_URI=sqlite:///testing.db
# export SECRET_KEY='\xed\x11p\xc0\xbb\x0cB\xdd\xcd\xa8\xbc\xce\xab\xb3\x04\x96r\x06\x1e\x16u\xa2A\x94'
# export SQLALCHEMY_DATABASE_URI=postgresql://baouwxygwzkdqt:a37616a7310dabb570ea5bf5f57a2dd69d85ccf1e942b80ec445e85c6aec3aad@ec2-54-211-176-156.compute-1.amazonaws.com:5432/d15m4igjfanpvj


