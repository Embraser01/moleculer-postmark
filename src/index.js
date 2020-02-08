const {ServerClient} = require("postmark");
const {Errors: {ServiceSchemaError}} = require("moleculer");

module.exports = {

	name: "postmark",

	/**
	 * Default settings
	 */
	settings: {},

	/**
	 * Actions
	 */
	actions: {
		sendEmail: {
			visibility: "public",
			params: {
				From: {type: "string"},
				To: {type: "string", optional: true},
				Cc: {type: "string", optional: true},
				Bcc: {type: "string", optional: true},
				Subject: {type: "string"},
				ReplyTo: {type: "string", optional: true},
				HtmlBody: {type: "string", optional: true},
				TextBody: {type: "string", optional: true},
				Tag: {type: "string", optional: true},
				TrackOpens: {type: "boolean", optional: true},
				TrackLinks: {
					type: "enum",
					enum: ["TextOnly", "HtmlOnly", "HtmlAndText", "None"],
					optional: true,
				},
				Headers: {
					type: "array",
					optional: true,
					items: {
						Name: {type: "string"},
						Value: {type: "string"}
					}
				},
				Attachments: {
					type: "array",
					optional: true,
					items: {
						Name: {type: "string"},
						ContentID: {type: "string", optional: true},
						Content: {type: "string"},
						ContentType: {type: "string"},
					}
				},
				Metadata: {type: "object", optional: true},
			},
			async handler(ctx) {
				return this.client.sendEmail(ctx.params);
			}
		},
	},

	/**
	 * Methods
	 */
	methods: {},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		if (!this.settings.serverToken) {
			throw new ServiceSchemaError("A serverToken is required");
		}

		this.client = new ServerClient(this.settings.serverToken);
	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	},
};
