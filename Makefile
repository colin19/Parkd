# Makefile specification
# ----------------------

GithubID = colin19
RepoName = Parkd
SHA      = ourSHA

.PHONY: githubid reponame sha github issues stories uml selenium frontend backend postman website report apidoc self other default

default:
	@echo "Please specify a command."

githubid:
	@echo "${GithubID}"

reponame:
	@echo "${RepoName}"

sha:
	@echo "${SHA}"


# make github   - prints link to github repo
github:
	@echo "http://www.github.com/${GithubID}/${RepoName}"

# make issues   - prints link to current phase's issues
issues:
	@echo "http://www.github.com/${GithubID}/${RepoName}/issues"

# make stories  - prints link to current phase's stories
stories:
	@echo "http://www.github.com/${GithubID}/${RepoName}/projects/1"

# make uml      - prints link to uml diagram
uml:
	@echo "https://jbanda11.gitbooks.io/technical-report/content/uml.html"

# make selenium - runs selenium tests
selenium:
	python frontend/guitests.py

# make frontend - runs frontend tests
frontend:
	@(cd frontend; npm run test)

# make backend  - runs backend tests
backend:
	python backend/tests.py
# make postman - runs postman tests
postman:
	newman run Postman.json

# make website  - prints link to website
website:
	@echo "http://parkd.us/"

# make report   - prints link to technical report
report:
	@echo "https://www.gitbook.com/book/jbanda11/technical-report/details"

# make apidoc   - prints link to api documentation
apidoc:
	@echo "https://www.gitbook.com/book/jbanda11/api-documentation/details"

# make self     - prints link to self critique
self:
	@echo "https://www.gitbook.com/book/jbanda11/self-critique/details"

# make other    - prints link to other critique
other:
	@echo "https://www.gitbook.com/book/jbanda11/other-critique/details"
