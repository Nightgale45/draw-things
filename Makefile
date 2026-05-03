COMPOSE := docker compose

.PHONY: help build-dev build-prod dev prod down logs lint frontend-lint-fix test

help: ## Show available targets
	@printf "\n\033[1mUsage:\033[0m make \033[36m<target>\033[0m\n"
	@awk 'BEGIN {FS = ":.*?## "} \
		/^##@/                  { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } \
		/^[a-zA-Z_-]+:.*?## /  { printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2 }' \
		$(MAKEFILE_LIST)
	@printf "\n"

##@ Docker
build-dev: ## Build the development image
	$(COMPOSE) --profile dev build

build-prod: ## Build the production image
	$(COMPOSE) --profile prod build

dev: build-dev ## Build and start the development server
	$(COMPOSE) --profile dev up

prod: build-prod ## Build and start the production server
	$(COMPOSE) --profile prod up

down: ## Stop and remove all containers
	$(COMPOSE) down

logs: ## Tail logs for all running services
	$(COMPOSE) logs -f

##@ Testing
frontend-lint: ## Run ESLint on the frontend
	cd frontend && npm run lint

frontend-lint-fix: ## Auto-fix ESLint issues in the frontend
	cd frontend && npm run lint -- --fix

test: frontend-lint ## Run all checks
